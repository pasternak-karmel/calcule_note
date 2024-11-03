import React from 'react';

interface Professor {
    id: string;
    name: string;
    subject: string;
    ue?: string;
}

interface ProfessorListProps {
    professors: Professor[];
    onDeleteProfessor: (id: string) => void;
    onAssignUE: (id: string) => void;
}

const ProfessorList: React.FC<ProfessorListProps> = ({ professors, onDeleteProfessor, onAssignUE }) => {
    return (
        <div>
            <h3>Liste des Professeurs</h3>
            <ul>
                {professors.map((professor) => (
                    <li key={professor.id}>
                        {professor.name} - {professor.subject}
                        {professor.ue && <span> (UE: {professor.ue})</span>}
                        <button onClick={() => onDeleteProfessor(professor.id)}>Supprimer</button>
                        <button onClick={() => onAssignUE(professor.id)}>Attribuer UE</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProfessorList;
