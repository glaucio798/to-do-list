package bridge.glaucio.backend.resolver;

import bridge.glaucio.backend.model.Tarefa
import bridge.glaucio.backend.model.TarefaInput
import bridge.glaucio.backend.service.TarefaService
import graphql.kickstart.tools.GraphQLMutationResolver
import org.springframework.stereotype.Component
import java.security.InvalidParameterException
import java.util.Objects

@Component
class TarefaMutationResolver(private val tarefaService: TarefaService) : GraphQLMutationResolver {

	fun salvarTarefa(input: TarefaInput) : Tarefa {

//		this.inputValidator.valdate(input).throwIfInvalid();

		return this.tarefaService.save(input);
	}

	fun excluirTarefa(id: Long) =
		this.tarefaService.delete(id);

	fun editarTarefa(input: TarefaInput): Tarefa {
		if(Objects.isNull(input.id))
			throw InvalidParameterException("Para editar uma tarefa é necessario passar o id")
		return this.tarefaService.edit(input)
	}
}
