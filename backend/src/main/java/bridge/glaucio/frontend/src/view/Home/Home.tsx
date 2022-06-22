import React, { useState } from "react";
import { useTarefasQuery, useDeleteTarefaMutation } from "../../graphql/hooks.generated";
import { DataTable, Icon, Button, Grid, Cell, HFlow, Heading } from 'bold-ui'
import {  ModalAdicionarTarefa } from './components/ModalAdicionarTarefa'
import { Tarefa } from "../../graphql/types.generated"


export function Home() {
    const [sort, setSort] = useState(['id'])
    const [deleteTarefa] = useDeleteTarefaMutation()

    const [isOpen, setIsOpen] = useState(false)
    const [action, setAction] = useState('ADD')
    const [formState, setFormState] = useState({
        id: '',
        responsavel: '',
        descricao: ''
    })

    const handleModal = (val: boolean) => {
        if(!val){
            setFormState({
                id: '',
                responsavel: '',
                descricao: ''
            })
        }
        setIsOpen(val)
    }

    const abrirModalEditar = (tarefa: Tarefa) => {
        setFormState({
            id: tarefa.id,
            responsavel: tarefa.responsavel,
            descricao: tarefa.descricao
        })
        setAction('EDIT')
        handleModal(true)
    }

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


    const refetchAll = () => {
        todosDadosTarefaRefetch()
    }

    if (error) return (<p> Error! ${error.message}</p>);
    if (todosDadosTarefaLoading) return (<p>Loading...</p>);

    return (
        <>
            <Grid gap={1} style={{ marginTop: '0rem', marginBottom: '0.25rem' }} justifyContent="center">
                <Cell xs={12}>
                    <HFlow justifyContent='center'>
                        <Heading level={1}>ToDo List</Heading>
                    </HFlow>
                </Cell>
                <Cell xs={10}>
                    <HFlow justifyContent='center'>
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
                                        name: 'edit',
                                        align: 'right',
                                        render: item => (
                                            <Button onClick={() => abrirModalEditar(item)} size='small' skin='ghost'>
                                                <Icon icon='penFilled' />
                                            </Button>
                                        ),
                                    },
                                    {
                                        name: 'delete',
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
                    </HFlow>
                </Cell>
                <Cell xs={10}>
                    <HFlow justifyContent="center">
                        <ModalAdicionarTarefa
                            onSucess={refetchAll}
                            formState={formState}
                            setFormState={setFormState}
                            action={action}
                            isOpen={isOpen}
                            setIsOpen={handleModal} />
                    </HFlow>
                </Cell>
            </Grid>
        </>
    );
}
