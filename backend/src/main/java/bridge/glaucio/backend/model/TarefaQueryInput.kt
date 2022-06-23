package bridge.glaucio.backend.model

import lombok.Data

@Data
data class TarefaQueryInput(
    val responsavel: String
)