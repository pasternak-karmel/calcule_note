import { useState } from 'react';

interface AddProfessorFormProps {
    onAddProfessor: (professor: { nom: string; prenom: string; ue: string }) => void;
}

const AddProfessorForm: React.FC<AddProfessorFormProps> = ({ onAddProfessor }) => {
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [ue, setUe] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddProfessor({ nom, prenom, ue });
        setNom('');
        setPrenom('');
        setUe('');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-gray-700">Nom</label>
                <input
                    type="text"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>
            <div>
                <label className="block text-gray-700">Prénom</label>
                <input
                    type="text"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>
            <div>
                <label className="block text-gray-700">Matière (UE)</label>
                <input
                    type="text"
                    value={ue}
                    onChange={(e) => setUe(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded-md"
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Ajouter Professeur
            </button>
        </form>
    );
};

export default AddProfessorForm;
