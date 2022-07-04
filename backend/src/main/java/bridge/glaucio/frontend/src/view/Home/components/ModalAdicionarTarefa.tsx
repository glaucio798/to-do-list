import { Button, Heading, HFlow, Modal, ModalBody, Cell, TextField, TextArea, DateField, VFlow, Grid } from 'bold-ui'
import React from 'react'
import { useEditTarefaMutation, useSalvarTarefaMutation } from '../../../graphql/hooks.generated'
import { TarefaInput } from '../../../graphql/types.generated'
import { Form, Field } from 'react-final-form'
import createDecorator from 'final-form-calculate'
import { maxLength, required } from '../../../util/validations'
import { FormApi } from 'final-form'

export type FormStateProps = {
    id: string,
    responsavel: string,
    descricao: string
}
export type FormState = {
    responsavel: string,
    descricao: string,
    dataPrazo: Date | string,
    diasPrazo: number,
}
export type FormStateErros = {
    responsavel?: string,
    descricao?: string,
    dataPrazo?: string,
    diasPrazo?: string,
}
export interface ModalAdicionarTarefaProps {
    onSucess: () => void,
    formState: FormStateProps,
    setFormState: (state: any) => void,
    action: string,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

export function ModalAdicionarTarefa({ onSucess, formState, setFormState, action, isOpen, setIsOpen }: ModalAdicionarTarefaProps) {

    const [salvarTarefa] = useSalvarTarefaMutation()
    const [editTarefa] = useEditTarefaMutation()

    const dataPrazoChange = (diasPrazoValue: number, allValues: any) => {
        var d = new Date()
        d.setTime(d.getTime() + diasPrazoValue * (1000 * 3600 * 24))
        return d
    }

    const calculator = createDecorator(
        {
            field: 'dataPrazo',
            updates: {
                diasPrazo: (dataPrazoValue: Date, allValues: any) => {
                    return  Math.ceil((dataPrazoValue.getTime() - new Date().getTime())/ (1000 * 3600 * 24))
                }
            }
        },
        {
            field: 'diasPrazo',
            updates: {
                dataPrazo: dataPrazoChange
            }
        }
    )

    const onSubmit = async (values: any, formApi: FormApi) => {        
        const tarefa: TarefaInput = {
            id: values.id,
            responsavel: values.responsavel,
            descricao: values.descricao
        }

        if (action === 'ADD') {
            return await salvarTarefa({
                variables: {
                    input: tarefa
                }
            }).then(() => {
                setIsOpen(false)
                onSucess()
            }).catch((error: { message: any }) => {
                alert(error.message)
            })
        } else {
            return await  editTarefa({
                variables: {
                    input: tarefa
                }
            }).then(() => {
                setIsOpen(false)
                onSucess()
            }).catch((error: { message: any }) => {
                alert(error.message)
            })
        }
    }

    return (
        <>
            <Button kind='primary' onClick={() => setIsOpen(true)}>
                Adicionar Tarefa
            </Button>
            <Modal size='small' onClose={() => setIsOpen(false)} open={isOpen}>
                <ModalBody>
                    <Grid justifyContent='center'>
                        <Heading level={1}>{ action === 'EDIT' ? 'Editar' : 'Adicionar' } tarefa</Heading>
                        <br />
                        <Form
                            onSubmit={onSubmit}
                            decorators={[calculator]}
                            validate={(values: any) => {
                                const errors:FormStateErros = {
                                }
                                
                                if (!values.responsavel) {
                                errors.responsavel = required('Responsável')
                                } else if (values.responsavel.length > 60) {
                                    errors.responsavel = maxLength('Responsável', 60)
                                }
                                if (!values.descricao) {
                                errors.descricao = required('Descrição')
                                } else if (values.descricao.length > 300) {
                                    errors.descricao = maxLength('Descrição', 300)
                                }
                                if (!values.dataPrazo || !values.diasPrazo) {
                                    errors.diasPrazo = required('Prazo')
                                }
                                console.log(errors);
                                
                                return errors
                            }}
                            render={({ handleSubmit, submitting, pristine }) => (
                                <>
                                    <Grid gap={1} justifyContent="center">
                                        <Cell size={10}>
                                            <Field
                                                name="responsavel"
                                                render={({ input, meta }) => (
                                                    <>
                                                        <TextField { ...input }
                                                            label='Responsável da tarefa'
                                                            placeholder='Responsável da tarefa'
                                                            required
                                                            />
                                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                                    </>
                                                )}
                                            />
                                        </Cell>
                                        <Cell size={10}>
                                            <Field
                                                name="descricao"
                                                render={({ input, meta }) => (
                                                    <>
                                                        <TextArea { ...input }
                                                            rows={6}
                                                            label='Descrição da tarefa'
                                                            placeholder='Descrição da tarefa'
                                                            required
                                                            />
                                                        {meta.touched && meta.error && <span>{meta.error}</span>}
                                                    </>
                                                )}
                                            />
                                        </Cell>
                                        <HFlow>
                                            <Grid justifyContent='space-around' gap={2}>
                                                <Cell size={4}>
                                                    <Field
                                                        name="dataPrazo"
                                                        render={({ input, meta }) => (
                                                            <DateField
                                                                icon="calendarOutline"
                                                                label="Prazo"
                                                                minDate={new Date()}
                                                                { ...input}
                                                                required
                                                                transformTwoYearDigit={false}
                                                                />
                                                        )}
                                                    />
                                                </Cell>

                                                <Cell size={4}>
                                                    <Field
                                                        name="diasPrazo"
                                                        render={({ input, meta }) => (
                                                            <>
                                                                <TextField { ...input }
                                                                    label='Prazo em dias'
                                                                    placeholder='000'
                                                                    required
                                                                    />
                                                                {meta.touched && meta.error && <span>{meta.error}</span>}
                                                            </>
                                                        )}
                                                    />
                                                </Cell>
                                            </Grid>
                                        </HFlow>
                                        <Cell xs={11}>
                                            <HFlow justifyContent='flex-end'>
                                            <Button kind='primary' onClick={handleSubmit} >
                                                { action === 'EDIT' ? 'EDITAR' : 'ADICIONAR' }
                                            </Button>
                                            </HFlow>
                                        </Cell>
                                    </Grid>
                                </>
                            )} 
                        />
                    </Grid>
                </ModalBody>
            </Modal>
        </>
    )
}
