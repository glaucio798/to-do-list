package bridge.glaucio.backend.command

import bridge.glaucio.backend.data.DAO
import bridge.glaucio.backend.model.Tarefa
import bridge.glaucio.backend.model.TarefaInput
import org.springframework.stereotype.Component

@Component
class TarefaSave(private val dao: DAO) {

    fun execute(t: TarefaInput): Tarefa {
        val tarefa = Tarefa(null, t.descricao, t.responsavel);

        this.dao.persist(tarefa);

        return tarefa;
    }

}