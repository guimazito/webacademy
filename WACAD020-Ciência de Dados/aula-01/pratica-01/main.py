import random
import numpy as np
import pandas as pd
from faker import Faker
from datetime import datetime

#! Carregamento dos Dados

# Carregando o arquivo CSV para um DataFrame
df_usuarios = pd.read_csv('usuarios_sujo.csv')

# Exibindo as dimensões do DataFrame (linhas, colunas)
# print(f"O dataset possui {df_usuarios.shape[0]} linhas e {df_usuarios.shape[1]} colunas.")

#! Inspeção Inicial (Data Profiling)

# print("--- Primeiras 5 linhas ---")
# print(df_usuarios.head())

# print("\n--- Últimas 5 linhas ---")
# print(df_usuarios.tail())

# print("\n--- Amostra aleatória de 5 linhas ---")
# print(df_usuarios.sample(5))

#! Usando .info() para um Resumo Técnico

# Obtendo um resumo técnico do DataFrame
# df_usuarios.info()

#! Usando .describe(include='all') para Estatísticas Descritivas

# Obtendo um resumo estatístico de todas as colunas
# print(df_usuarios.describe(include='all'))

#! Tratando Dados Faltantes (Valores Nulos)

# Contando o número de valores nulos em cada coluna
# print(df_usuarios.isnull().sum())

#! Estratégia 1: Remover Linhas com dropna()

# Verificando o número de linhas antes da remoção
# print(f"Número de linhas antes de remover nulos em 'email': {len(df_usuarios)}")

# Contando os nulos em 'email' para confirmar
# print(f"Número de valores nulos em 'email': {df_usuarios['email'].isnull().sum()}\n")

# Removendo as linhas onde a coluna 'email' é nula
# O parâmetro 'inplace=True' modifica o DataFrame diretamente, sem precisar de reatribuição (df = df.dropna(...))
# df_usuarios.dropna(subset=['email'], inplace=True)

# Verificando o número de linhas depois da remoção
# print(f"Número de linhas após remover nulos em 'email': {len(df_usuarios)}")

# Confirmando que não há mais nulos em 'email'
# print(f"Número de valores nulos em 'email' agora: {df_usuarios['email'].isnull().sum()}")

#! Estratégia 2: Imputar Valores com fillna()

# try:
#     mediana_compra = df_usuarios['valor_ultima_compra'].median()
#     print(f"Mediana calculada: {mediana_compra}")
# except TypeError as e:
#     print(f"Ocorreu um erro: {e}")
#     print("\nNão podemos calcular a mediana de uma coluna que não é numérica! Isso nos leva ao próximo passo.")

#! Corrigindo Tipos de Dados

# Passo 1: Limpar a string
# Usamos.str para aplicar métodos de string a toda a coluna
df_usuarios['valor_ultima_compra'] = df_usuarios['valor_ultima_compra'].str.replace('R$ ', '', regex=False)
df_usuarios['valor_ultima_compra'] = df_usuarios['valor_ultima_compra'].str.replace(',', '.', regex=False)

# Passo 2: Converter para tipo numérico, tratando erros
df_usuarios['valor_ultima_compra'] = pd.to_numeric(df_usuarios['valor_ultima_compra'], errors='coerce')

# Vamos verificar o tipo de dado da coluna agora
print("Tipo de dado de 'valor_ultima_compra' após conversão:")
print(df_usuarios.dtypes['valor_ultima_compra'])

# E ver como ficaram os 10 primeiros valores
print("\nValores após conversão (note os novos NaNs onde antes era 'Não informado'):")
print(df_usuarios[['nome', 'valor_ultima_compra']].head(10))

#! Agora sim: Imputando a Mediana

# Verificando nulos ANTES da imputação
print(f"Nulos em 'valor_ultima_compra' ANTES da imputação: {df_usuarios['valor_ultima_compra'].isnull().sum()}")

# 1. Calcular a mediana (agora vai funcionar!)
mediana_compra = df_usuarios['valor_ultima_compra'].median()
print(f"A mediana calculada é: R$ {mediana_compra:.2f}")

# 2. Preencher os valores nulos com a mediana
df_usuarios['valor_ultima_compra'].fillna(mediana_compra, inplace=True)

# Verificando nulos depois da imputação
print(f"Nulos em 'valor_ultima_compra' APÓS a imputação: {df_usuarios['valor_ultima_compra'].isnull().sum()}")

#! Convertendo Colunas de Data

# Convertendo a coluna 'data_cadastro' para datetime
# 'format="mixed"' permite que o pandas tente adivinhar múltiplos formatos
df_usuarios['data_cadastro'] = pd.to_datetime(df_usuarios['data_cadastro'], format='mixed', errors='coerce', dayfirst=False)

# A coluna 'data_ultimo_login' tem um formato mais consistente, mas ainda é object
df_usuarios['data_ultimo_login'] = pd.to_datetime(df_usuarios['data_ultimo_login'], errors='coerce')

# Vamos verificar os tipos de dados novamente com.info()
print("--- Verificação dos Dtypes após conversão de datas ---")
df_usuarios.info()


#! Exercício 2: Cálculos Pós-Conversão

media_compra = df_usuarios['valor_ultima_compra'].median()
print(f"O valor médio da coluna valor_ultima_compra é: R$ {media_compra:.2f}")

data_mais_recente = df_usuarios['data_ultimo_login'].max()
print(f"Data do último login mais recente: {data_mais_recente}")

# Seleciona a data do último login do primeiro usuário
data_login = df_usuarios.loc[0, 'data_ultimo_login']
# Calcula a diferença em dias entre hoje e a data do último login
dias_desde_login = (datetime.now() - data_login).days
print(f"O último login do primeiro usuário foi há {dias_desde_login} dias.")

#!  Removendo Duplicatas

# Verificando o número de linhas duplicadas
num_duplicatas = df_usuarios.duplicated().sum()
print(f"\nNúmero de linhas duplicadas encontradas: {num_duplicatas}")

# Removendo as duplicatas
print(f"Linhas antes de remover duplicatas: {len(df_usuarios)}")
df_usuarios.drop_duplicates(inplace=True)
print(f"Linhas após remover duplicatas: {len(df_usuarios)}")

#! Padronizando Dados Categóricos

# Verificando os valores únicos na coluna 'estado'
print("\nValores únicos em 'estado' ANTES da padronização:")
print(df_usuarios['estado'].unique())

# Criando o dicionário de mapeamento para corrigir as inconsistências
mapa_estados = {
    'São Paulo': 'SP',
    'sao paulo': 'SP',
    'Rio de Janeiro': 'RJ',
    'rio de janeiro': 'RJ'
    # Não precisamos mapear 'SP' -> 'SP' ou 'RJ' -> 'RJ', o replace ignora chaves que não encontra
}

# Aplicando a substituição
df_usuarios['estado'].replace(mapa_estados, inplace=True)

# Verificando os valores únicos novamente para confirmar a limpeza
print("\nValores únicos em 'estado' APÓS a padronização:")
print(df_usuarios['estado'].unique())

#! Salvando o Trabalho

# Verificação final
df_usuarios.info()

# Salvando o DataFrame limpo em um novo arquivo CSV
df_usuarios.to_csv('usuarios_limpo.csv', index=False)
print("Arquivo 'usuarios_limpo.csv' salvo com sucesso!")