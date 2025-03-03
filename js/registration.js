// registration.js - JavaScript for the counselling registration form

document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    const citySelect = document.getElementById('city');
    const neetScoreSelect = document.getElementById('neetScore');
    const scoreInput = document.querySelector('.neet-score-input');
    const form = document.getElementById('counsellingForm');
    const successMessage = document.getElementById('successMessage');
    
    // Hardcoded states list
    const states = [
        'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
        'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
        'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
        'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
        'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
        'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
    ];
    
    let statesAndCities = {};

    // Fetch the cities data from the local JSON file
    async function fetchCitiesData() {
        try {
            const response = await fetch('json/indian_cities.json'); // Ensure this file is hosted correctly
            
            if (!response.ok) {
                throw new Error('Failed to fetch cities data');
            }
            
            statesAndCities = await response.json();
            populateStates();
        } catch (error) {
            console.error('Error fetching cities data:', error);
        }
    }
    
    // Populate the states dropdown
    function populateStates() {
        states.sort();
        states.forEach(state => {
            const option = document.createElement('option');
            option.value = state;
            option.textContent = state;
            stateSelect.appendChild(option);
        });
    }
    
    // Populate cities based on selected state
    function populateCities(state) {
        citySelect.innerHTML = '<option value="">Select City *</option>';

        // Check if the state exists in the JSON data
        if (statesAndCities[state] && Array.isArray(statesAndCities[state])) {
            statesAndCities[state].sort().forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        } else {
            console.warn(`No cities found for state: ${state}`);
        }
    }
    
    // Show/hide NEET score input based on selection
    neetScoreSelect.addEventListener('change', function() {
        if (this.value === 'yes') {
            scoreInput.style.display = 'block';
            document.getElementById('score').required = true;
        } else {
            scoreInput.style.display = 'none';
            document.getElementById('score').required = false;
        }
    });
    
    // Update cities when state changes
    stateSelect.addEventListener('change', function() {
        if (this.value) {
            populateCities(this.value);
        } else {
            citySelect.innerHTML = '<option value="">Select City *</option>';
        }
    });
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            mobile: document.getElementById('mobile').value,
            email: document.getElementById('email').value,
            state: document.getElementById('state').value,
            city: document.getElementById('city').value,
            interestedCountry: document.getElementById('country').value,
            hasNeetScore: document.getElementById('neetScore').value,
            neetScore: document.getElementById('neetScore').value === 'yes' ? document.getElementById('score').value : 'N/A',
            hasPassport: document.getElementById('passport').value,
            submissionDate: new Date().toISOString().slice(0, 10)
        };
        
        console.log('Form submitted:', formData);
        successMessage.style.display = 'block';
        form.reset();
        scoreInput.style.display = 'none';
        
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    });
    
    // Initialize by fetching cities data
    fetchCitiesData();
});
