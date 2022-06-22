import { Button, Heading, HFlow, Modal, ModalBody, Cell, Grid, TextField, ModalFooter } from 'bold-ui'
import React, { useState } from 'react'
import { useSalvarTarefaMutation } from '../../../graphql/hooks.generated'
import { TarefaQueryInput } from '../../../graphql/types.generated'

export interface ModalAdicionarTarefaProps {
    onSucess: () => void
}

export function ModalAdicionarTarefa({ onSucess }: ModalAdicionarTarefaProps) {
    const [isOpen, setIsOpen] = useState(false)

    const [salvarTarefa] = useSalvarTarefaMutation()

    const [formState, setFormState] = useState({
        responsavel: '',
        descricao: ''
    })

    const handleSubmit = () => {
        alert(JSON.stringify(formState, null, 2))

        const tarefa: TarefaQueryInput = {
            responsavel: formState.responsavel,
            descricao: formState.descricao
        }

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
    }

    const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const el = e.target

        setFormState(state => ({
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
                            <Heading level={1}>Adicionar tarefa</Heading>
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
