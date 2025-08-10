import numpy as np
import pandas as pd
import matplotlib as mpl
import matplotlib.pyplot as plt
from pandas import Series, DataFrame

vg = pd.read_csv('Video_Games_Sales_as_at_22_Dec_2016.csv')

#!  Mostra os 5 primeiros registros

vg.head()
print(vg.sample(5))

#! Mostra os 5 últimos registros

vg.tail()

#! Mostra as colunas do DataFrame

print(vg.columns)

#! Mostra a estrutura do DataFrame

print(vg.info())

#! Acessando os dados de um jogo especifico

vg.loc[130]
vg2 = vg.loc[[1,5,10,20]]
print(vg.loc[0:100])

#! Podemos também acessar colunas especificas através dos seus nomes

vg[ ['Name','Critic_Score'] ]
print(vg.Global_Sales)

#! Quantos jogos para cada sistema nós temos?

print(vg.Genre.value_counts().plot(kind='bar'))

#! Contando a quantidade de valores diferentes de um atributo numérico

print(vg.Critic_Score.value_counts())

#! Colocando em categorias

b = list(range(0,101,10))
print(vg.Critic_Score.value_counts(bins=b))
print(vg.describe())

#! Como podemos identificar um jogo com lançamento em 2020

print(vg[vg.Year_of_Release==2020])

#! Como substituir os jogos com lançamento em 2020 para 2010

vg.loc[vg.Year_of_Release==2020, ['Year_of_Release']] = [2010]
print(vg.describe())

#! Quais são os jogos mais recentes da base para Nintendo PS2

print(vg[vg.Platform=='PS2'].sort_values(['Global_Sales','Year_of_Release'],ascending = False).head())

#! Jogos de PS2 que tiveram mais do que 20 críticas ordenados pela nota da critica

#vg[(vg.Platform=='PS2')][(vg.Critic_Count>20)].sort_values(['Critic_Score']).head()
print(vg[(vg.Platform=='PS2') & (vg.Critic_Count>20)].sort_values(['Critic_Score']).head())

#! Gere uma base vg2, contendo todos os jogos lançados de 2000 a 2016 e a descreva com describe

print('\n\n')
vg2 = vg[(vg.Year_of_Release >= 2000) & (vg.Year_of_Release <= 2016)]
print(vg2.describe())

#! Mostre todos os jogos lançados até o ano 2000 onde as vendas japonesas foram acima das americanas, ordenado por vendas globais

result = vg[(vg.Year_of_Release <= 2000) & (vg.JP_Sales > vg.NA_Sales)].sort_values('Global_Sales', ascending=False)
print(result)

#! Conte, para cada plataforma, quantos jogos com nota de usuário acima de 8 cada uma tem

contagem = vg[vg.User_Score > 8].groupby('Platform').size()
print(contagem)

#! Usando pandas para plotar com pyplot

vg[vg.Global_Sales<80].plot(kind='scatter',x='Critic_Score',y='Global_Sales')
# plt.show()
plt.savefig('grafico.png')
#outlier
#vg[vg.Global_Sales>80]

#! Total de anos que um console teve jogos

vgplat = vg.loc[(vg.Platform == 'DS') & (vg.Year_of_Release == 1985), 'Year_of_Release'] = 2007
vgplat = vg.groupby(['Platform'])
vgplat.Global_Sales.sum()
vgplat.Critic_Score.min()
anos = vgplat.Year_of_Release.max() - vgplat.Year_of_Release.min()
anos.plot(kind='bar')
plt.savefig('grafico2.png')
print(vg[vg.Platform == 'DS'].Year_of_Release.min())
print(vg[vg.Platform == 'DS'].Year_of_Release.max())
print(vg[vg.Platform == 'DS'][['Name', 'Year_of_Release']].sort_values('Year_of_Release'))
plataforma = 'DS'  # ou qualquer outra plataforma
min_ano = vg[vg.Platform == plataforma]['Year_of_Release'].min()
max_ano = vg[vg.Platform == plataforma]['Year_of_Release'].max()
duracao = max_ano - min_ano
print(f"A plataforma {plataforma} teve jogos lançados por {duracao} anos (de {min_ano} a {max_ano}).")

# python3 -m venv venv
# source venv/bin/activate