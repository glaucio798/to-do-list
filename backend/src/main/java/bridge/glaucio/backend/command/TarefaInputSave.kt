package bridge.glaucio.backend.command

import bridge.glaucio.backend.data.DAO
import bridge.glaucio.backend.model.Tarefa
import bridge.glaucio.backend.model.TarefaQueryInput
import org.springframework.stereotype.Component

@Component
class TarefaInputSave(private val dao: DAO) {

    fun execute(t: TarefaQueryInput): Tarefa {
        val tarefa = Tarefa(null, t.descricao, t.responsavel);

        dao.persist(tarefa);

        return tarefa;
    }

}