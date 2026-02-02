import PropTypes from 'prop-types'

// Composant générique pour filtrer les posts par un champ (ex: author, tag)
export default function PostFilter({ field, value, onChange }) {
  return (
    <div>
      {/* Label lié à l'input pour l'accessibilité */}
      <label htmlFor={`filter-${field}`}>{field}: </label>
      {/* Champ de saisie contrôlé */}
      <input
        type='text'
        name={`filter-${field}`} // Nom dynamique basé sur le champ à filtrer
        id={`filter-${field}`} // Id unique pour le label
        value={value} // Valeur contrôlée par le parent
        onChange={(e) => onChange(e.target.value)} // Remonte la nouvelle valeur au parent
      />
    </div>
  )
}

// Définition des types attendus pour les props du composant
PostFilter.propTypes = {
  field: PropTypes.string.isRequired, // Nom du champ à filtrer (ex: 'author', 'tag')
  value: PropTypes.string.isRequired, // Valeur actuelle du filtre
  onChange: PropTypes.func.isRequired, // Fonction appelée à chaque changement de valeur
}
