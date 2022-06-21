import React, { useEffect, useState } from "react";
import { useTarefasQuery, useTarefasResponsaveisQuery } from "../graphql/hooks.generated";
import { DataTable } from 'bold-ui'

interface apenasResponsavelTarefaType {
    id?: number,
    responsavel?: string
}

interface tarefaType {
    id?: number,
    responsavel?: string,
    descricao?: string
}

export function Home() {
    const [sort, setSort] = useState(['id'])
    const [apenasResponsavelTarefaList, setApenasResponsavelTarefaList] = useState<apenasResponsavelTarefaType[]>([])
    const [tarefaList, setTarefaList] = useState<tarefaType[]>([])

    const {
        data: todosDadosTarefa ,
        loading: todosDadosTarefaLoading,
        error,

    } = useTarefasQuery()

    const {
        data: apenasResponsavelTarefa,
        loading: apenasResponsavelTarefaLoading
    } = useTarefasResponsaveisQuery()

    useEffect(() => {
        if (todosDadosTarefa && todosDadosTarefa?.tarefas){
            setTarefaList(todosDadosTarefa.tarefas as tarefaType[]);
        }
    },[todosDadosTarefa])

    useEffect(() => {
        if (apenasResponsavelTarefa && apenasResponsavelTarefa?.tarefas){
            setApenasResponsavelTarefaList(apenasResponsavelTarefa.tarefas as apenasResponsavelTarefaType[]);
        }
    },[apenasResponsavelTarefa])

    if (error) return (<p> Error! ${error.message}</p>);
    if (apenasResponsavelTarefaLoading || todosDadosTarefaLoading) return (<p>Loading...</p>);

    return (
        <>
            {!todosDadosTarefaLoading && tarefaList?.length > 0 &&
                <DataTable<tarefaType>
                    rows={tarefaList}
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
                            render: item => "X"
                            // render: item => (
                            //     <Button size='small' skin='ghost'>
                            //     <Icon icon='penOutline' />
                            //     </Button>
                            // ),
                        },
                    ]}
                />
            }
            <p>------------------------------------------------------------------</p>
            {apenasResponsavelTarefaList && apenasResponsavelTarefaList?.length > 0 &&
                <DataTable<apenasResponsavelTarefaType>
                    rows={apenasResponsavelTarefaList}
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
                            render: item => "X"
                            // render: item => (
                            //     <Button size='small' skin='ghost'>
                            //     <Icon icon='penOutline' />
                            //     </Button>
                            // ),
                        },
                    ]}
                />
            }

        </>
    );
}