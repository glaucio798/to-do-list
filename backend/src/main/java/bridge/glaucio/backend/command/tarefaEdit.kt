package bridge.glaucio.backend.command

import bridge.glaucio.backend.data.DAO
import bridge.glaucio.backend.model.Tarefa
import bridge.glaucio.backend.model.TarefaInput
import org.springframework.stereotype.Component
import java.util.Objects

@Component
class tarefaEdit(private val dao: DAO)  {

    fun execute(input: TarefaInput): Tarefa {
        val tarefa: Tarefa = this.dao.safeFind(Tarefa::class.java, input.id)
        val novaTarefa =
            Tarefa(tarefa.id,
                if (Objects.nonNull(input.descricao)) input.descricao else tarefa.descricao,
                if (Objects.nonNull(input.responsavel)) input.responsavel else tarefa.responsavel
            )

        this.dao.update(novaTarefa)

        return tarefa
    }

}