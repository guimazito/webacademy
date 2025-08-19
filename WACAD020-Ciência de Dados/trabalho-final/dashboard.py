import pandas as pd
import streamlit as st
import matplotlib.pyplot as plt

@st.cache_data
def read_file():
    # source: https://dataserver-coids.inpe.br/queimadas/queimadas/focos/csv/anual/Brasil_todos_sats/focos_br_todos-sats_2024.zip
    return pd.read_csv('focos_br_todos-sats_2024.csv')

# Loading dataset
try:
    df_loaded = read_file()
except FileNotFoundError:
    print("Erro: Arquivo não encontrado.")

# Checking columns number
columns = len(df_loaded.columns)
# print(f"Colunas disponíveis: {columns}")

# Checking rows number
rows = df_loaded.shape[0]
# print(f"Número de linhas: {rows}")

# Removing rows with missing 'bioma' values
df_loaded = df_loaded[df_loaded['bioma'].notnull()]

# Checking for missing values
# print(f"\nMissing values by columns: \n{df_loaded.isnull().sum()}")

# Checking rows with missing values
# print(f"Missing values rows: {df_loaded[df_loaded.isnull().any(axis=1)]}")

# pd.set_option('display.max_columns', None)
# print(df_loaded[df_loaded['numero_dias_sem_chuva'].isnull()])

# Checking for duplicates
# print(f"Duplicates Total: {df_loaded.duplicated().sum()}")

# Show duplicated rows
# print(f"Duplicated rows: {df_loaded[df_loaded.duplicated()]}")

# Convert 'data_pas' to datetime
df_loaded['data_pas'] = pd.to_datetime(df_loaded['data_pas'])

# Creating a new column 'dia' from 'data_pas'
df_loaded['dia'] = df_loaded['data_pas'].dt.day

# Creating a new column 'mes' from 'data_pas'
df_loaded['mes'] = df_loaded['data_pas'].dt.month

# Creating a new column 'ano' from 'data_pas'
df_loaded['ano'] = df_loaded['data_pas'].dt.year

# Show dataframe info
# print(df_loaded.info())

#! Stealit Dashboard
# st.set_option('server.maxMessageSize', 400)
st.title("Dashboard de Análise de Queimadas")
st.markdown("""
Este dashboard interativo, desenvolvido em Streamlit, permite a análise e visualização de dados sobre queimadas no Brasil. Com ele, é possível explorar a distribuição dos focos de incêndio por bioma, região e período, identificar padrões e tendências ao longo do tempo, além de apoiar a tomada de decisões para a conservação ambiental. Utilize os filtros disponíveis para personalizar sua análise e obter insights relevantes sobre este importante tema ambiental.
""")

#! Filtro Interativo
# Lista de estados + opção "Todos os Estados"
estados = sorted(df_loaded['estado'].unique())
estados_opcoes = ["Todos os Estados"] + estados

# Dropdown na sidebar
estado_selecionado = st.sidebar.selectbox("Selecione o estado:", estados_opcoes)

# Filtra o DataFrame conforme seleção
if estado_selecionado == "Todos os Estados":
    df_estado = df_loaded
else:
    df_estado = df_loaded[df_loaded['estado'] == estado_selecionado]

#! Mostrar na mesma linha
col1, col2 = st.columns(2)


#! Mapa Geográfico
st.subheader(f"Mapa Geográfico")
st.map(df_estado[['latitude', 'longitude']].head(10000))


#! Gráfico Temporal
st.subheader("Gráfico Temporal")
focos_por_mes = df_estado['mes'].value_counts().sort_index()
fig, ax = plt.subplots()
focos_por_mes.plot(kind='bar', ax=ax)
ax.set_xlabel('Mês')
ax.set_ylabel('Número de focos')
ax.set_title(f'Número de focos por mês em {estado_selecionado}')
st.pyplot(fig)

#! Tabela de Dados
colunas_relevantes = ['data_pas', 'municipio', 'bioma']
novos_nomes = {
    'data_pas': 'Data Hora',
    'municipio': 'Município',
    'bioma': 'Bioma'
}
df_tabela = df_estado[colunas_relevantes].rename(columns=novos_nomes)
st.subheader("Tabela de Dados")
st.dataframe(df_tabela.head(10), hide_index=True)

#! Métricas Principais (KPIs)
total_focos = len(df_estado)
bioma_mais_afetado = (
    df_estado['bioma'].mode()[0] if not df_estado['bioma'].empty else "N/A"
)
st.subheader("Métricas Principais (KPIs)")
colA, colB = st.columns(2)
with colA:
    st.metric("Total de Focos Registrados", total_focos)
with colB:
    st.metric("Bioma Mais Afetado", bioma_mais_afetado)

# python3 -m venv venv
# source venv/bin/activate
# pip install -r requirements.txt
# streamlit run dashboard.py