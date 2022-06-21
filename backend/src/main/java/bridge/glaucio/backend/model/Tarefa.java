package bridge.glaucio.backend.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name = "TB_TAREFA")
public class Tarefa implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID")
	private long id;

	@Column(name = "DESCRICAO")
	private String descricao;

	@Column(name = "RESPONSAVEL")
	private String responsavel;

}
