package bridge.glaucio.backend.resolver;

import bridge.glaucio.backend.model.Tarefa
import bridge.glaucio.backend.model.TarefaQueryInput
import bridge.glaucio.backend.service.TarefaService
import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component

@Component
class TarefaMutationResolver(private val tarefaService: TarefaService) : GraphQLMutationResolver {

	fun salvarTarefa(input: TarefaQueryInput) : Tarefa {

//		this.inputValidator.valdate(input).throwIfInvalid();

		return this.tarefaService.save(input);
	}

	fun excluirTarefa(id: Long) =
		this.tarefaService.delete(id);
}
