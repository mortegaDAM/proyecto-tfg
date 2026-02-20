package com.dando_la_vez.backend.services;
import com.dando_la_vez.backend.model.Mercado;
import com.dando_la_vez.backend.repository.MercadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MercadoService {
     @Autowired
    private MercadoRepository mercadoRepository;

    public List<Mercado> getAllMercados(){
        return mercadoRepository.findAll();
    }
    public Optional<Mercado> findById(int id){
        return mercadoRepository.findById(id);
    }
    public Mercado createMercado(Mercado mercado){
        // analizar si el usuario esta en la bbdd
        return mercadoRepository.save(mercado);
    }
    public Mercado updateMercado(Mercado mercado){
        return mercadoRepository.save(mercado);
    }

}
