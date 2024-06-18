// if the user is an active learner, put exercises and self-assessments in front of list
// if reflexive learner, put them at the back of the list
const sortLOs = (learningObjects, learningPreferences) => {
    let sortedLOs = learningObjects;
    if (learningPreferences.active >= 0.5) {
        sortedLOs = learningObjects.sort((a, b) => {
            if (a.educational.learningResourceType === 'exercise' || a.educational.learningResourceType === 'self assessment' || a.educational.learningResourceType === 'questionnaire' || a.educational.learningResourceType === 'problem statement') {
                return -1;
            } else {
                return 1;
            }
         });
    } else {
        sortedLOs = learningObjects.sort((a, b) => {
            if (a.educational.learningResourceType === 'exercise' || a.educational.learningResourceType === 'self assessment' || a.educational.learningResourceType === 'questionnaire' || a.educational.learningResourceType === 'problem statement') {
                return 1;
            } else {
                return -1;
            }
         });
    }
    console.log(sortedLOs);
    return sortedLOs;
}

export { sortLOs };