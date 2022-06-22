package bridge.glaucio.backend.model

import lombok.Data

@Data
data class TarefaInput(
    var id: Long? = null,
    var descricao: String,
    var responsavel: String
)