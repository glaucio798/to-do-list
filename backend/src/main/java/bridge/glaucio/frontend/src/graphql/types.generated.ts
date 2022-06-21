export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: 'Query'
  tarefas: Array<Maybe<Tarefa>>
}

export type Tarefa = {
  __typename?: 'Tarefa'
  descricao?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['ID']>
  responsavel?: Maybe<Scalars['String']>
}

export type TarefaQueryInput = {
  descricao: Scalars['String']
  id: Scalars['ID']
  responsavel: Scalars['String']
}

export type TarefasQueryVariables = {}

export type TarefasQuery = {
  __typename?: 'Query'
  tarefas: Array<
    Maybe<{ __typename?: 'Tarefa'; id?: Maybe<string>; descricao?: Maybe<string>; responsavel?: Maybe<string> }>
  >
}

export type TarefasResponsaveisQueryVariables = {}

export type TarefasResponsaveisQuery = {
  __typename?: 'Query'
  tarefas: Array<Maybe<{ __typename?: 'Tarefa'; id?: Maybe<string>; responsavel?: Maybe<string> }>>
}
