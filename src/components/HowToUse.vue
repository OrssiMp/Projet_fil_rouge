<template>
    <div class="container mx-auto px-4 py-8">
        <!-- -->
        <div>
            <h2>Comment fonctionne Mosalah ?</h2>
            <p>
                Que vous recherchez un emploi ou que vous souhaitiez recruter, Mosalah simplifiechaque étape processus.
            </p>
        </div>
        <RoadmapInitial theme="success" :currentStep="1" direction="vertical">
            <RoadmapStep>Validation de la candidature</RoadmapStep>
            <RoadmapStep>Entretien technique</RoadmapStep>
            <RoadmapStep>Embauche</RoadmapStep>
        </RoadmapInitial>
    </div>
</template>

<script setup>

</script>
