package com.example.microserviceevaluation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EvaluationService {

    @Autowired
    private EvaluationRepository evaluationRepository;

    // Créer ou mettre à jour une évaluation
    public Evaluation saveEvaluation(Evaluation evaluation) {
        return evaluationRepository.save(evaluation);
    }

    // Récupérer toutes les évaluations
    public List<Evaluation> getAllEvaluations() {
        return evaluationRepository.findAll();
    }

    // Récupérer une évaluation par son ID
    public Optional<Evaluation> getEvaluationById(int id) {
        return evaluationRepository.findById(id);
    }

    // Supprimer une évaluation par son ID
    public void deleteEvaluation(int id) {
        evaluationRepository.deleteById(id);
    }
}
