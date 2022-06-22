import { Button, Heading, HFlow, Modal, ModalBody, Cell, Grid, TextField, ModalFooter } from 'bold-ui'
import React from 'react'
import { useEditTarefaMutation, useSalvarTarefaMutation } from '../../../graphql/hooks.generated'
import { TarefaQueryInput } from '../../../graphql/types.generated'

export type formStateProps = {
    id: string,
    responsavel: string,
    descricao: string
}
export interface ModalAdicionarTarefaProps {
    onSucess: () => void,
    formState: formStateProps,
    setFormState: (state: any) => void,
    action: string,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

export function ModalAdicionarTarefa({ onSucess, formState, setFormState, action, isOpen, setIsOpen }: ModalAdicionarTarefaProps) {

    const [salvarTarefa] = useSalvarTarefaMutation()
    const [editTarefa] = useEditTarefaMutation()

    const handleSubmit = () => {
        const tarefa: TarefaQueryInput = {
            id: formState.id,
            responsavel: formState.responsavel,
            descricao: formState.descricao
        }

        if (action === 'ADD') {
            salvarTarefa({
                variables: {
                    input: tarefa
                }
            }).then(() => {
                setIsOpen(false)
                onSucess()
            }).catch(error => {
                alert(error.message)
            })
        } else {
            editTarefa({
                variables: {
                    input: tarefa
                }
            }).then(() => {
                setIsOpen(false)
                onSucess()
            }).catch(error => {
                alert(error.message)
            })
        }
    }

    const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const el = e.target

        setFormState((state: any) => ({
            ...state,
            [name]: el.value,
        }))
    }

    return (
        <>
            <Button kind='primary' onClick={() => setIsOpen(true)}>
                Adicionar Tarefa
            </Button>
            <Modal size='small' onClose={() => setIsOpen(false)} open={isOpen}>
                <ModalBody>
                    <HFlow alignItems='center'>
                        <div>
                            <Heading level={1}>{ action === 'EDIT' ? 'Editar' : 'Adicionar' + JSON.stringify(action) + ' sad ' } tarefa</Heading>
                        </div>
                    </HFlow>
                    <br />
                    <form >
                        <Grid wrap>
                        <Cell xs={6}>
                            <div>
                                <TextField
                                    name='responsavel'
                                    label='responsavel do responsavel'
                                    placeholder='responsavel do responsavel'
                                    value={formState.responsavel}
                                    onChange={handleChange('responsavel')}
                                    required
                                    />
                            </div>
                        </Cell>
                        <Cell xs={6}>
                            <TextField
                                name='descricao'
                                label='Descrição da tarefa'
                                placeholder='Descrição da tarefa'
                                value={formState.descricao}
                                onChange={handleChange('descricao')}
                                required
                                />
                        </Cell>
                        </Grid>
                    </form>
                </ModalBody>
                <ModalFooter >
                <Grid wrap>
                        <Cell xs={12}>
                            <HFlow justifyContent='flex-end'>
                                <Button onClick={() => handleSubmit()} kind='primary'>
                                    ADICIONAR
                                </Button>
                            </HFlow>
                        </Cell>
                        </Grid>
                </ModalFooter>
            </Modal>
        </>
    )
}
