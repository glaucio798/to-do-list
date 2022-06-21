package bridge.glaucio.backend.resolver;

import java.util.List;

import javax.annotation.Nullable;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;


import bridge.glaucio.backend.model.Tarefa;
import bridge.glaucio.backend.service.TarefaService;
import graphql.kickstart.tools.GraphQLQueryResolver;

@Component
@RequiredArgsConstructor
public class TarefaQueryResolver implements GraphQLQueryResolver {

	private final TarefaService tarefaService;

	public List<Tarefa> tarefas() {
		return this.tarefaService.getTarefas();
	}
}
