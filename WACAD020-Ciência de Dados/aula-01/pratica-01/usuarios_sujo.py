# Importando as bibliotecas
import pandas as pd
import numpy as np
import random
from faker import Faker
from datetime import datetime

# Inicializando o Faker para gerar dados em português
fake = Faker('pt_BR')

# Função para gerar os dados sujos
def gerar_dados_sujos(num_usuarios=200):
    dados = []

    # Formatos de data que vamos misturar
    formatos_data = ['%Y-%m-%d', '%d/%m/%Y', '%m-%d-%Y', '%d-%b-%Y']

    # Variações para os estados
    estados_sp = ['SP', 'São Paulo', 'sao paulo']
    estados_rj = ['RJ', 'Rio de Janeiro', 'rio de janeiro']
    outros_estados = ['MG', 'PR', 'BA', 'SC']

    for i in range(num_usuarios):
        # Introduzindo valores faltantes (NaN) de forma aleatória
        email = fake.email() if random.random() > 0.1 else np.nan # 10% de chance de email nulo
        valor_compra = round(random.uniform(10, 1000), 2) if random.random() > 0.15 else np.nan # 15% de chance de valor nulo

        # Formatando o valor da compra como string com inconsistências
        if pd.notna(valor_compra):
            valor_compra_str = f"R$ {valor_compra:.2f}".replace('.', ',')
        else:
            # Adicionando outras strings não numéricas para sujar mais
            valor_compra_str = np.nan if random.random() > 0.3 else 'Não informado'

        # Escolhendo um formato de data aleatório
        formato_escolhido = random.choice(formatos_data)
        data_cadastro = fake.date_between(start_date='-2y', end_date='today').strftime(formato_escolhido)

        # Escolhendo um estado com inconsistências
        if i % 4 == 0:
            estado = random.choice(estados_sp)
        elif i % 7 == 0:
            estado = random.choice(estados_rj)
        else:
            estado = random.choice(outros_estados)

        dado = {
            'user_id': fake.uuid4(),
            'nome': fake.name(),
            'email': email,
            'data_cadastro': data_cadastro,
            'cidade': fake.city(),
            'estado': estado,
            'valor_ultima_compra': valor_compra_str,
            'data_ultimo_login': fake.date_time_between(start_date='-30d', end_date='now')
        }
        dados.append(dado)

    df = pd.DataFrame(dados)

    # Introduzindo linhas duplicadas
    duplicatas = df.sample(n=15, random_state=42)
    df_final = pd.concat([df, duplicatas]).reset_index(drop=True)

    return df_final

# Gerar e salvar o arquivo CSV
df_sujo = gerar_dados_sujos()
df_sujo.to_csv('usuarios_sujo.csv', index=False)

print("Arquivo 'usuarios_sujo.csv' gerado com sucesso!")
print(f"Total de linhas: {len(df_sujo)}")

# python3 -m venv venv
# source venv/bin/activate