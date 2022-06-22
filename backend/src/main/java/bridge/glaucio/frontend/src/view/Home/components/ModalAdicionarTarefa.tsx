import { Button, Heading, HFlow, Modal, ModalBody, Cell, Grid, TextField, ModalFooter, TextArea } from 'bold-ui'
import React from 'react'
import { useEditTarefaMutation, useSalvarTarefaMutation } from '../../../graphql/hooks.generated'
import { TarefaInput } from '../../../graphql/types.generated'

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
        const tarefa: TarefaInput = {
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

    const handleChangeTextArea = (name: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
                            <Heading level={1}>{ action === 'EDIT' ? 'Editar' : 'Adicionar' } tarefa</Heading>
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
                        <Cell xs={10}>
                            <TextArea
                                rows={6}
                                name='descricao'
                                label='Descrição da tarefa'
                                placeholder='Descrição da tarefa'
                                value={formState.descricao}
                                onChange={handleChangeTextArea('descricao')}
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
