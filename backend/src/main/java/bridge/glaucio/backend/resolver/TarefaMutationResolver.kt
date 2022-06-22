package bridge.glaucio.backend.resolver;

import bridge.glaucio.backend.model.Tarefa
import bridge.glaucio.backend.model.TarefaQueryInput
import bridge.glaucio.backend.service.TarefaService
import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component
import java.security.InvalidParameterException
import java.util.Objects

@Component
class TarefaMutationResolver(private val tarefaService: TarefaService) : GraphQLMutationResolver {

	fun salvarTarefa(input: TarefaQueryInput) : Tarefa {

//		this.inputValidator.valdate(input).throwIfInvalid();

		return this.tarefaService.save(input);
	}

	fun excluirTarefa(id: Long) =
		this.tarefaService.delete(id);

	fun editarTarefa(input: TarefaQueryInput): Tarefa {
		if(Objects.isNull(input.id))
			throw InvalidParameterException("Para editar uma tarefa é necessario passar o id")
		return this.tarefaService.edit(input)
	}
}
