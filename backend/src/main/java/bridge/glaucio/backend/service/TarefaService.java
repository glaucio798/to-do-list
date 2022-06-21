package bridge.glaucio.backend.service;

import java.util.List;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;

import bridge.glaucio.backend.command.TarefaQuery;
import bridge.glaucio.backend.model.Tarefa;

@Component
@RequiredArgsConstructor
public class TarefaService {

	private final TarefaQuery tarefaQuery;

	public List<Tarefa> getTarefas() {
		return tarefaQuery.execute();
	}

}
