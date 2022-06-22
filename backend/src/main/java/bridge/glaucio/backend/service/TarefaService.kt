package bridge.glaucio.backend.service;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;

import bridge.glaucio.backend.command.TarefaInputSave;
import bridge.glaucio.backend.command.TarefaQuery;
import bridge.glaucio.backend.model.Tarefa;
import bridge.glaucio.backend.model.TarefaQueryInput;

@Component
@RequiredArgsConstructor
class TarefaService(
	private val tarefaQuery: TarefaQuery,
	private val tarefaInputSave: TarefaInputSave
) {

	fun getTarefas(): List<Tarefa> {
		return tarefaQuery.execute();
	}

	fun save(input: TarefaQueryInput): Tarefa { return tarefaInputSave.execute(input); }

}
