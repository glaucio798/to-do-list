import React, { useState } from "react";
import { useTarefasQuery, useTarefasResponsaveisQuery, useDeleteTarefaMutation } from "../../graphql/hooks.generated";
import { DataTable, Icon, Button } from 'bold-ui'
import { ModalAdicionarTarefa } from './components/ModalAdicionarTarefa'
import { Tarefa } from "../../graphql/types.generated"


export function Home() {
    const [sort, setSort] = useState(['id'])
    const [deleteTarefa] = useDeleteTarefaMutation()

    const excluirTarefa = (id: string) => {
        deleteTarefa({
            variables: {
                id
            }
        }).then(() => {
            refetchAll()
        }).catch(error => {
            alert(error.message)
        })
    }

    const {
        data: todosDadosTarefa ,
        loading: todosDadosTarefaLoading,
        refetch: todosDadosTarefaRefetch,
        error,

    } = useTarefasQuery()

    const {
        data: apenasResponsavelTarefa,
        loading: apenasResponsavelTarefaLoading,
        refetch: apenasResponsavelTarefaRefetch,
    } = useTarefasResponsaveisQuery()

    const refetchAll = () => {
        todosDadosTarefaRefetch()
        apenasResponsavelTarefaRefetch()
    }

    if (error) return (<p> Error! ${error.message}</p>);
    if (apenasResponsavelTarefaLoading || todosDadosTarefaLoading) return (<p>Loading...</p>);

    return (
        <>
            {!todosDadosTarefaLoading && todosDadosTarefa?.tarefas && todosDadosTarefa?.tarefas?.length > 0 &&
                <DataTable<Tarefa>
                    rows={todosDadosTarefa.tarefas as Tarefa[]}
                    sort={sort}
                    onSortChange={setSort}
                    loading={todosDadosTarefaLoading}
                    columns={[
                        {
                            name: 'id',
                            header: 'ID',
                            sortable: true,
                            render: item => item.id,
                        },
                        {
                            name: 'responsavel',
                            header: 'responsavel',
                            render: item => item.responsavel,
                        },
                        {
                            name: 'descricao',
                            header: 'Descrição',
                            render: item => item.descricao,
                        },
                        {
                            name: 'actions',
                            align: 'right',
                            render: item => (
                                <Button onClick={() => excluirTarefa(item.id)} size='small' skin='ghost'>
                                    <Icon icon='trashFilled' />
                                </Button>
                            ),
                        },
                    ]}
                />
            }
            <p>------------------------------------------------------------------</p>
            {!apenasResponsavelTarefaLoading && apenasResponsavelTarefa?.tarefas && apenasResponsavelTarefa?.tarefas?.length > 0 &&
                <DataTable<Tarefa>
                    rows={apenasResponsavelTarefa.tarefas as Tarefa[]}
                    sort={sort}
                    onSortChange={setSort}
                    loading={apenasResponsavelTarefaLoading}
                    columns={[
                        {
                            name: 'id',
                            header: 'ID',
                            sortable: true,
                            render: item => item.id,
                        },
                        {
                            name: 'responsavel',
                            header: 'responsavel',
                            render: item => item.responsavel,
                        },
                        {
                            name: 'actions',
                            align: 'right',
                            render: item => (
                                <Button onClick={() => excluirTarefa(item.id)} size='small' skin='ghost'>
                                    <Icon icon='trashFilled' />
                                </Button>
                            ),
                        },
                    ]}
                />
            }
            <ModalAdicionarTarefa onSucess={refetchAll} />

        </>
    );
}