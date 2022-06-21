package bridge.glaucio.backend.command

import bridge.glaucio.backend.data.DAO
import bridge.glaucio.backend.model.QTarefa.tarefa
import bridge.glaucio.backend.model.Tarefa
import org.springframework.stereotype.Component

@Component
class TarefaQuery(private val dao: DAO) {

    fun execute(): List<Tarefa>? =
        dao.queryFactory().selectFrom(tarefa)
            .fetch();

}