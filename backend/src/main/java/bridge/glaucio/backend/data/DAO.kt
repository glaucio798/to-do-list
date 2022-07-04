package bridge.glaucio.backend.data

import com.querydsl.jpa.impl.JPAQueryFactory
import org.springframework.stereotype.Repository
import javax.persistence.EntityManager
import javax.persistence.EntityNotFoundException
import javax.persistence.LockModeType
import javax.persistence.PersistenceContext
import javax.persistence.PersistenceException

@Repository
class DAO {
    @PersistenceContext
    protected var em: EntityManager? = null
    fun remove(entity: Any?) {
        em!!.remove(entity)
    }

    fun safeRemove(entity: Any?) {
        try {
            em!!.remove(entity)
            em!!.flush()
        } catch (e: PersistenceException) {
            throw PersistenceException()
        }
    }

    fun <E> safeFind(clazz: Class<E>?, id: Any?): E {
        return em!!.find(clazz, id) ?: throw EntityNotFoundException()
    }

    fun <E> safeFind(clazz: Class<E>?, id: Any?, lockModeType: LockModeType?): E {
        return em!!.find(clazz, id, lockModeType) ?: throw EntityNotFoundException()
    }

    fun <E> safeFind(clazz: Class<E>?, id: Any?, errorMessage: String?): E {
        return em!!.find(clazz, id) ?: throw EntityNotFoundException(errorMessage)
    }

    fun <E> update(ob: E): E {
        return em!!.merge(ob)
    }

    fun <E> getReference(clazz: Class<E>?, id: Any?): E {
        return em!!.getReference(clazz, id) ?: throw EntityNotFoundException()
    }

    fun persist(entity: Any?) {
        em!!.persist(entity)
    }

    fun queryFactory(): JPAQueryFactory {
        return JPAQueryFactory(em)
    }

    fun <E> find(clazz: Class<E>?, id: Any?): E {
        return em!!.find(clazz, id)
    }

    fun flush() {
        em!!.flush()
    }

    fun clear() {
        em!!.clear()
    }

    fun detach(`object`: Any?) {
        em!!.detach(`object`)
    }

    fun refresh(entity: Any?) {
        em!!.refresh(entity)
    }
}