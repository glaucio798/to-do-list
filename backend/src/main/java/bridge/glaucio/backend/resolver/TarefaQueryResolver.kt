package bridge.glaucio.backend.resolver;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;


import bridge.glaucio.backend.model.Tarefa;
import bridge.glaucio.backend.model.TarefaQueryInput
import bridge.glaucio.backend.service.TarefaService;
import graphql.kickstart.tools.GraphQLQueryResolver;

@Component
@RequiredArgsConstructor
class TarefaQueryResolver(private val tarefaService: TarefaService) : GraphQLQueryResolver {

	fun tarefas(input: TarefaQueryInput): List<Tarefa> {
		val tarefaList : List<Tarefa> = this.tarefaService.getTarefas(input).toList();
		return tarefaList;
	}
}
