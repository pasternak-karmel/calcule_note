"use client";
import { useState } from 'react';
import AddProfessorForm from '../../components/professors/AddProfessorForm';

interface Professor {
    id: string;
    nom: string;
    prenom: string;
    ue: string[]; // Permet de gérer plusieurs UEs pour un prof
}

const ProfessorsPage: React.FC = () => {
    const [professors, setProfessors] = useState<Professor[]>([]);
    const [showList, setShowList] = useState(false);

    const handleAddProfessor = (newProfessor: { nom: string; prenom: string; ue: string }) => {
        const id = Math.random().toString(36).substr(2, 9);
        setProfessors([...professors, { id, nom: newProfessor.nom, prenom: newProfessor.prenom, ue: [newProfessor.ue] }]);
    };

    const handleDeleteProfessor = (id: string) => {
        setProfessors(professors.filter((prof) => prof.id !== id));
    };

    const handleAssignUE = (id: string) => {
        const ueName = prompt("Entrez le nom de l'UE:");
        if (ueName) {
            setProfessors(professors.map((prof) =>
                prof.id === id ? { ...prof, ue: [...prof.ue, ueName] } : prof
            ));
        }
    };

    return (
        <div className={`flex flex-col ${showList ? 'lg:flex-row' : ''} gap-4 p-4`}>
            {/* Colonne gauche : Formulaire d'ajout et boutons */}
            <div className={`flex-1 bg-white shadow-md p-6 rounded-lg ${showList ? '' : 'max-w-lg mx-auto'}`}>
                <h1 className="text-xl font-bold mb-4 text-blue-600">Gestion des Professeurs</h1>
                <AddProfessorForm onAddProfessor={handleAddProfessor} />

                <div className="flex justify-end mt-4">
                    <button
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        onClick={() => setShowList(true)}
                    >
                        Liste des profs
                    </button>
                </div>
            </div>

            {/* Colonne droite : Liste des professeurs */}
            {showList && (
                <div className="flex-1 bg-white shadow-md p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Liste des Professeurs</h2>
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="border-b py-2">Nom</th>
                                <th className="border-b py-2">Prénom</th>
                                <th className="border-b py-2">Matière</th>
                                <th className="border-b py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {professors.map((prof) => (
                                <tr key={prof.id} className="border-b">
                                    <td className="py-2">{prof.nom}</td>
                                    <td className="py-2">{prof.prenom}</td>
                                    <td className="py-2">{prof.ue.join(', ')}</td>
                                    <td className="py-2 flex gap-2">
                                        <button
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleDeleteProfessor(prof.id)}
                                        >
                                            Supprimer
                                        </button>
                                        <button
                                            className="text-blue-500 hover:text-blue-700"
                                            onClick={() => handleAssignUE(prof.id)}
                                        >
                                            Ajouter UE
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ProfessorsPage;
