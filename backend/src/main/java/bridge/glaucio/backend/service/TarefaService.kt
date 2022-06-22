package bridge.glaucio.backend.service;

import bridge.glaucio.backend.command.TarefaInputSave
import bridge.glaucio.backend.command.TarefaQuery
import bridge.glaucio.backend.command.tarefaDelete
import bridge.glaucio.backend.command.tarefaEdit
import bridge.glaucio.backend.model.Tarefa
import bridge.glaucio.backend.model.TarefaQueryInput
import lombok.RequiredArgsConstructor
import org.springframework.stereotype.Component
import javax.transaction.Transactional

@Component
@RequiredArgsConstructor
open class TarefaService(
	private val tarefaQuery: TarefaQuery,
	private val tarefaInputSave: TarefaInputSave,
	private val tarefaDelete: tarefaDelete,
	private val tarefaEdit: tarefaEdit
) {

	open fun getTarefas(): List<Tarefa> {
		return tarefaQuery.execute();
	}

	@Transactional
	open fun save(input: TarefaQueryInput): Tarefa = tarefaInputSave.execute(input)

	@Transactional
	open fun delete(id: Long) = tarefaDelete.execute(id)

	@Transactional
	open fun edit(input: TarefaQueryInput): Tarefa = tarefaEdit.execute(input)
}
