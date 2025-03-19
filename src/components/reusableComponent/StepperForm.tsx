import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';

interface StepperFormProps {
    steps: string[];
    onSubmit: () => Promise<void>;
    saveOnStep: boolean;
    children: React.ReactNode[];
    isStepValid: boolean,
    onReset: () => void;
}

const StepperForm: React.FC<StepperFormProps> = ({ steps, onSubmit, saveOnStep, children, isStepValid, onReset }) => {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = async () => {
        if (saveOnStep) {
            try {
                await onSubmit();
                setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
            } catch (error) {
            }
        } else {
            setActiveStep(prev => Math.min(prev + 1, steps.length - 1));
        }
    };


    const handleBack = () => setActiveStep(prev => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        try {
            await onSubmit();
            handleReset();

        } catch (error) {

        }

    };
    const handleReset = () => {
        setActiveStep(0);
        onReset();
    };
    return (
        <Box>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box>
                {children[activeStep]}
            </Box>
            <Box>
                <Button disabled={activeStep === 0} onClick={handleBack}>previous</Button>

                {activeStep === steps.length - 1 ? (
                    <Button onClick={handleSubmit} disabled={!isStepValid}>Submit</Button>
                ) : (
                    <Button onClick={handleNext} disabled={!isStepValid}>Next</Button>
                )}
            </Box>
        </Box>
    );
};

export default StepperForm;
