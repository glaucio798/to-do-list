package bridge.glaucio.backend.data;

import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.LockModeType;
import javax.persistence.PersistenceContext;
import javax.persistence.PersistenceException;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class DAO {

	@PersistenceContext
	protected EntityManager em;

	public void remove(Object entity) {
		this.em.remove(entity);
	}

	public void safeRemove(Object entity) {
		try {
			this.em.remove(entity);
			this.em.flush();
		} catch (PersistenceException e) {
			throw new PersistenceException();
		}
	}

	public <E> E safeFind(Class<E> clazz, Object id) {
		E entity = this.em.find(clazz, id);
		if (entity == null) {
			throw new EntityNotFoundException();
		}
		return entity;
	}

	public <E> E safeFind(Class<E> clazz, Object id, LockModeType lockModeType) {
		E entity = this.em.find(clazz, id, lockModeType);
		if (entity == null) {
			throw new EntityNotFoundException();
		}
		return entity;
	}

	public <E> E safeFind(Class<E> clazz, Object id, String errorMessage) {
		E entity = this.em.find(clazz, id);
		if (entity == null) {
			throw new EntityNotFoundException(errorMessage);
		}
		return entity;
	}

	public <E> E update(E ob) {
		return this.em.merge(ob);
	}

	public <E> E getReference(Class<E> clazz, Object id) {
		E entity = this.em.getReference(clazz, id);
		if (entity == null) {
			throw new EntityNotFoundException();
		}
		return entity;
	}

	public void persist(Object entity) {
		this.em.persist(entity);
	}

	public JPAQueryFactory queryFactory() {
		return new JPAQueryFactory(this.em);
	}

	public <E> E find(Class<E> clazz, Object id) {
		return this.em.find(clazz, id);
	}

	public void flush() {
		this.em.flush();
	}

	public void clear() {
		this.em.clear();
	}

	public void detach(Object object) {
		this.em.detach(object);
	}

	public void refresh(Object entity) {
		this.em.refresh(entity);
	}

}
