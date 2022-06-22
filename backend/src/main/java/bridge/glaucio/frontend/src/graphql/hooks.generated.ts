import * as Types from './types.generated'

import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'

export const SalvarTarefaDocument = gql`
  mutation salvarTarefa($input: TarefaQueryInput!) {
    salvarTarefa(input: $input) {
      id
    }
  }
`
export type SalvarTarefaMutationFn = ApolloReactCommon.MutationFunction<
  Types.SalvarTarefaMutation,
  Types.SalvarTarefaMutationVariables
>

/**
 * __useSalvarTarefaMutation__
 *
 * To run a mutation, you first call `useSalvarTarefaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSalvarTarefaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [salvarTarefaMutation, { data, loading, error }] = useSalvarTarefaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSalvarTarefaMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<Types.SalvarTarefaMutation, Types.SalvarTarefaMutationVariables>
) {
  return ApolloReactHooks.useMutation<Types.SalvarTarefaMutation, Types.SalvarTarefaMutationVariables>(
    SalvarTarefaDocument,
    baseOptions
  )
}
export type SalvarTarefaMutationHookResult = ReturnType<typeof useSalvarTarefaMutation>
export type SalvarTarefaMutationResult = ApolloReactCommon.MutationResult<Types.SalvarTarefaMutation>
export type SalvarTarefaMutationOptions = ApolloReactCommon.BaseMutationOptions<
  Types.SalvarTarefaMutation,
  Types.SalvarTarefaMutationVariables
>
export const TarefasDocument = gql`
  query Tarefas {
    tarefas {
      id
      descricao
      responsavel
    }
  }
`

/**
 * __useTarefasQuery__
 *
 * To run a query within a React component, call `useTarefasQuery` and pass it any options that fit your needs.
 * When your component renders, `useTarefasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTarefasQuery({
 *   variables: {
 *   },
 * });
 */
export function useTarefasQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<Types.TarefasQuery, Types.TarefasQueryVariables>
) {
  return ApolloReactHooks.useQuery<Types.TarefasQuery, Types.TarefasQueryVariables>(TarefasDocument, baseOptions)
}
export function useTarefasLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Types.TarefasQuery, Types.TarefasQueryVariables>
) {
  return ApolloReactHooks.useLazyQuery<Types.TarefasQuery, Types.TarefasQueryVariables>(TarefasDocument, baseOptions)
}
export type TarefasQueryHookResult = ReturnType<typeof useTarefasQuery>
export type TarefasLazyQueryHookResult = ReturnType<typeof useTarefasLazyQuery>
export type TarefasQueryResult = ApolloReactCommon.QueryResult<Types.TarefasQuery, Types.TarefasQueryVariables>
export const TarefasResponsaveisDocument = gql`
  query TarefasResponsaveis {
    tarefas {
      id
      responsavel
    }
  }
`

/**
 * __useTarefasResponsaveisQuery__
 *
 * To run a query within a React component, call `useTarefasResponsaveisQuery` and pass it any options that fit your needs.
 * When your component renders, `useTarefasResponsaveisQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTarefasResponsaveisQuery({
 *   variables: {
 *   },
 * });
 */
export function useTarefasResponsaveisQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    Types.TarefasResponsaveisQuery,
    Types.TarefasResponsaveisQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<Types.TarefasResponsaveisQuery, Types.TarefasResponsaveisQueryVariables>(
    TarefasResponsaveisDocument,
    baseOptions
  )
}
export function useTarefasResponsaveisLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    Types.TarefasResponsaveisQuery,
    Types.TarefasResponsaveisQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<Types.TarefasResponsaveisQuery, Types.TarefasResponsaveisQueryVariables>(
    TarefasResponsaveisDocument,
    baseOptions
  )
}
export type TarefasResponsaveisQueryHookResult = ReturnType<typeof useTarefasResponsaveisQuery>
export type TarefasResponsaveisLazyQueryHookResult = ReturnType<typeof useTarefasResponsaveisLazyQuery>
export type TarefasResponsaveisQueryResult = ApolloReactCommon.QueryResult<
  Types.TarefasResponsaveisQuery,
  Types.TarefasResponsaveisQueryVariables
>
