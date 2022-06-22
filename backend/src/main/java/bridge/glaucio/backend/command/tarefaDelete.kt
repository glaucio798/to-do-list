package bridge.glaucio.backend.command

import bridge.glaucio.backend.data.DAO
import bridge.glaucio.backend.model.Tarefa
import org.springframework.stereotype.Component

@Component
class tarefaDelete(private val dao: DAO)  {

    fun execute(id: Long) {
        val tarefa: Tarefa = this.dao.getReference(Tarefa::class.java, id);
        this.dao.safeRemove(tarefa);
    }

}