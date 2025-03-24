import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Card, CardActions, CardContent, CardHeader } from '@mui/material';
import Grid from '@mui/material/Grid2';


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
        <Grid container justifyContent="center" alignSelf={'center'} >
            <Grid size={8}>

                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                        <Step key={index}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <Card   >
                    <CardHeader title={steps[activeStep]}></CardHeader>

                    <CardContent>
                        {children[activeStep]}
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between', gap: 2, padding: 2 }}>
                        <Button disabled={activeStep === 0} onClick={handleBack} variant='outlined'>previous</Button>
                        {activeStep === steps.length - 1 ? (
                            <Button onClick={handleSubmit} disabled={!isStepValid} variant='outlined'>Submit</Button>
                        ) : (
                            <Button onClick={handleNext} disabled={!isStepValid} variant='outlined'>Next</Button>
                        )}
                    </CardActions>
                </Card>
            </Grid>
        </Grid>

    );
};

export default StepperForm;
