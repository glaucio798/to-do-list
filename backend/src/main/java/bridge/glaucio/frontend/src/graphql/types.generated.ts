export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Mutation = {
  __typename?: 'Mutation'
  editarTarefa: Tarefa
  excluirTarefa?: Maybe<Scalars['ID']>
  salvarTarefa: Tarefa
}

export type MutationEditarTarefaArgs = {
  input?: Maybe<TarefaQueryInput>
}

export type MutationExcluirTarefaArgs = {
  id: Scalars['ID']
}

export type MutationSalvarTarefaArgs = {
  input: TarefaQueryInput
}

export type Query = {
  __typename?: 'Query'
  tarefas: Array<Maybe<Tarefa>>
}

export type Tarefa = {
  __typename?: 'Tarefa'
  descricao: Scalars['String']
  id: Scalars['ID']
  responsavel: Scalars['String']
}

export type TarefaQueryInput = {
  descricao: Scalars['String']
  id?: Maybe<Scalars['ID']>
  responsavel: Scalars['String']
}

export type DeleteTarefaMutationVariables = {
  id: Scalars['ID']
}

export type DeleteTarefaMutation = { __typename?: 'Mutation'; excluirTarefa?: Maybe<string> }

export type EditTarefaMutationVariables = {
  input: TarefaQueryInput
}

export type EditTarefaMutation = {
  __typename?: 'Mutation'
  editarTarefa: { __typename?: 'Tarefa'; id: string; responsavel: string; descricao: string }
}

export type SalvarTarefaMutationVariables = {
  input: TarefaQueryInput
}

export type SalvarTarefaMutation = { __typename?: 'Mutation'; salvarTarefa: { __typename?: 'Tarefa'; id: string } }

export type TarefasQueryVariables = {}

export type TarefasQuery = {
  __typename?: 'Query'
  tarefas: Array<Maybe<{ __typename?: 'Tarefa'; id: string; descricao: string; responsavel: string }>>
}

export type TarefasResponsaveisQueryVariables = {}

export type TarefasResponsaveisQuery = {
  __typename?: 'Query'
  tarefas: Array<Maybe<{ __typename?: 'Tarefa'; id: string; responsavel: string }>>
}
