package bridge.glaucio.backend.resolver;

import javax.annotation.Nullable;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Component;


import bridge.glaucio.backend.model.Tarefa;
import bridge.glaucio.backend.service.TarefaService;
import graphql.kickstart.tools.GraphQLQueryResolver;

@Component
@RequiredArgsConstructor
class TarefaQueryResolver(private val tarefaService: TarefaService) : GraphQLQueryResolver {

	fun tarefas(): List<Tarefa> {
		val tarefaList : List<Tarefa> = this.tarefaService.getTarefas().toList();
		return tarefaList;
	}
}
