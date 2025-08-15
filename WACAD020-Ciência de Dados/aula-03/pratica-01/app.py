import pandas as pd
import streamlit as st # Remova o comentário se estiver testando no ambiente Streamlit
import streamlit as st
import pandas as pd
import plotly.express as px # Adicione plotly.express aqui para uso futuro

# Carregar o dataset
# Certifique-se de que o arquivo usuarios_limpo.csv está na mesma pasta do app.py
try:
    df_loaded = pd.read_csv('usuarios_limpo.csv')
    # Converter a coluna 'data_cadastro' para datetime
    df_loaded['data_cadastro'] = pd.to_datetime(df_loaded['data_cadastro'])
    print("DataFrame carregado e coluna 'data_cadastro' convertida para datetime:")
    print(df_loaded.info())
except FileNotFoundError:
    print("Erro: Arquivo 'usuarios_limpo.csv' não encontrado. Por favor, execute a célula de geração de dados sintéticos primeiro.")

# Carregar o dataset
try:
    df = pd.read_csv('usuarios_limpo.csv')
    df['data_cadastro'] = pd.to_datetime(df['data_cadastro'])
except FileNotFoundError:
    st.error("Arquivo 'usuarios_limpo.csv' não encontrado. Por favor, execute a célula de geração de dados sintéticos e salve o arquivo.")
    st.stop() # Parar a execução do Streamlit se o arquivo não for encontrado

# Adicionar um título com st.title()
st.title("Dashboard de Análise de Usuários")

# Adicionar um texto de introdução com st.write() ou st.markdown()
st.markdown("""
Este dashboard interativo permite explorar o perfil dos nossos usuários,
sua distribuição geográfica e a evolução dos cadastros ao longo do tempo.
Utilize os filtros na barra lateral para análises mais detalhadas.
""")

# Exemplo de cálculo e exibição de KPIs usando o DataFrame 'df_filtrado'
# Este código faria parte do seu app.py, após a lógica de filtragem inicial

# Assumindo que df_filtrado já está definido (veja a seção de interatividade)
if 'df_filtrado' not in locals(): # Apenas para fins de demonstração no notebook
    df_filtrado = df_loaded.copy() # Usar o df_loaded do exemplo de carregamento

total_usuarios = df_filtrado['user_id'].nunique()
media_valor_compra = df_filtrado['valor_ultima_compra'].mean()

# Exibir KPIs usando st.metric()
# Usaremos st.columns para colocá-los lado a lado (veremos mais sobre st.columns adiante)
# st.columns retorna uma tupla de objetos de coluna, que você pode desempacotar
col1, col2 = st.columns(2)
with col1:
   st.metric(label="Total de Usuários", value=f"{total_usuarios:,}".replace(",", "."), delta="Simulado: +10%") # Simulação de delta
with col2:
   st.metric(label="Média Última Compra", value=f"R$ {media_valor_compra:,.2f}".replace(",", "X").replace(".", ",").replace("X", "."), delta="Simulado: -2.5%") # Simulação de delta

print(f"Total de Usuários (simulado para dashboard): {total_usuarios}")
print(f"Média Última Compra (simulado para dashboard): R$ {media_valor_compra:.2f}")

# Garantir que df_filtrado está disponível para este exemplo
if 'df_filtrado' not in locals():
    df_filtrado = df_loaded.copy() # Usar o df_loaded do exemplo de carregamento

# Gráfico de barras: Distribuição de Usuários por Estado
st.subheader("Distribuição de Usuários por Estado") # No app.py
usuarios_por_estado = df_filtrado['estado'].value_counts().reset_index()
usuarios_por_estado.columns = ['Estado', 'Número de Usuários']

fig_estado = px.bar(
    usuarios_por_estado,
    x='Estado',
    y='Número de Usuários',
    title='Distribuição de Usuários por Estado Selecionado',
    color='Número de Usuários', # Adiciona cor baseada no número de usuários
    color_continuous_scale=px.colors.sequential.Plasma # Escala de cores
)

# fig_estado.show()
st.plotly_chart(fig_estado, use_container_width=True)

# Garantir que df_filtrado está disponível para este exemplo
if 'df_filtrado' not in locals():
    df_filtrado = df_loaded.copy() # Usar o df_loaded do exemplo de carregamento

# Gráfico de linhas: Evolução dos Cadastros ao Longo do Tempo
st.subheader("Evolução dos Cadastros (por Mês)") # No app.py

# Agrupar por mês para uma visão mais suave da evolução
df_filtrado_copy = df_filtrado.copy() # Crie uma cópia para evitar SettingWithCopyWarning
df_filtrado_copy['mes_cadastro'] = df_filtrado_copy['data_cadastro'].dt.to_period('M').astype(str)
cadastros_por_mes = df_filtrado_copy.groupby('mes_cadastro').size().reset_index(name='Número de Cadastros')

# Converter de volta para datetime para Plotly ordenar corretamente
cadastros_por_mes['mes_cadastro'] = pd.to_datetime(cadastros_por_mes['mes_cadastro'])
cadastros_por_mes = cadastros_por_mes.sort_values('mes_cadastro')

fig_evolucao = px.line(
    cadastros_por_mes,
    x='mes_cadastro',
    y='Número de Cadastros',
    title='Evolução dos Cadastros ao Longo do Tempo Selecionado',
    markers=True # Adiciona marcadores nos pontos de dados
)

# fig_evolucao.show()
# No Streamlit, você usaria:
st.plotly_chart(fig_evolucao, use_container_width=True)

st.sidebar.header("Filtros")

# Obter a lista única de estados para o filtro
estados_unicos = sorted(df['estado'].unique().tolist())

# Criar o filtro de seleção múltipla para estados
estados_selecionados = st.sidebar.multiselect(
    "Selecione o(s) Estado(s)",
    options=estados_unicos,
    default=estados_unicos # Por padrão, todos os estados são selecionados
)

# python3 -m venv venv
# source venv/bin/activate
# streamlit run app.py