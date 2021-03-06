package bridge.glaucio.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.RequiredArgsConstructor
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType

@Entity
@Data
@Table(name = "TB_TAREFA")
class Tarefa(

	@Id
	@Column(name = "ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	val id: Long?=null,

	@Column(name = "DESCRICAO", nullable = false)
	val descricao: String,

	@Column(name = "RESPONSAVEL", nullable = false)
	val responsavel: String,

) : Serializable {

	companion object {
		private const val serialVersionUID = 1L
	}


}
