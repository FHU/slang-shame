function DevSlangEdit() {
  return (
    <div>
        <h1>
            Page for Devs to Add, Edit and Remove Slang via API
        </h1>
        <p>
            This should be able to add new slang and edit already made slang
            to better work with the Appwrite backend table 'slang'
        </p>
        <p>
            The parts of speech that can be add to partOfSpeech column of a
            slang should just be these:
            <ul>
                <li>Noun</li>
                <li>Verb</li>
                <li>Adverb</li>
                <li>Adjective</li>
                <li>Prepositions</li>
                <li>Interjection</li>
                <li>Onomatopoeia</li>
                <li>Prefix</li>
                <li>Suffix</li>
            </ul>
            If there is extra stuff needed, let the team know.
        </p>
    </div>
  )
}

export default DevSlangEdit