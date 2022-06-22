package bridge.glaucio.backend.command

import bridge.glaucio.backend.data.DAO
import bridge.glaucio.backend.model.QTarefa.tarefa
import bridge.glaucio.backend.model.Tarefa
import bridge.glaucio.backend.model.TarefaQueryInput
import com.querydsl.core.BooleanBuilder
import org.springframework.stereotype.Component
import java.util.Objects

@Component
class TarefaQuery(private val dao: DAO) {

    fun execute(input: TarefaQueryInput): List<Tarefa> {
        val booleanBuilder = BooleanBuilder()

        if(Objects.nonNull(input.responsavel) && input.responsavel.isNotEmpty())
            booleanBuilder.and(tarefa.responsavel.like('%' + input.responsavel + '%'))

        return dao.queryFactory().selectFrom(tarefa)
            .where(booleanBuilder)
            .fetch().orEmpty();
    }

}