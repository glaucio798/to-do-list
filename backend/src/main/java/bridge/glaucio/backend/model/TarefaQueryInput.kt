package bridge.glaucio.backend.model

import lombok.Data

@Data
data class TarefaQueryInput(
    val id: Long? = null,
    val descricao: String? = null,
    val responsavel: String? = null
)