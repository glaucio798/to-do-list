package bridge.glaucio.backend.model

import lombok.Data

@Data
data class TarefaQueryInput(
    var id: Long? = null,
    var descricao: String,
    var responsavel: String
)