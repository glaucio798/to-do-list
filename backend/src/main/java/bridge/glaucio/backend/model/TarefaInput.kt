package bridge.glaucio.backend.model

import lombok.Data

@Data
data class TarefaInput(
    val id: Long? = null,
    val descricao: String,
    val responsavel: String
)