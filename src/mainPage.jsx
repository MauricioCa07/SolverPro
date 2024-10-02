import React, { useState } from 'react';
import { Secant } from './secant.jsx';
import { Gaussian } from './gaussian.jsx';
import { MultipleRoots } from './MultipleRoots.jsx';
import { GaussianPartialPivoting } from './GaussianPartialPivoting.jsx';
import { GaussianTotalPivoting } from './GaussianTotalPivoting.jsx';
import { search } from './search.jsx';
import { bisection } from './bisection.jsx';
import { falserule } from './falserule.jsx';

const MainPage = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);

    const renderMethod = () => {
        switch (selectedMethod) {
            case 'secant':
                return <Secant f="log(sin(x)^2 + 1) - 1/2" tolerancestr="1e-7" iterationsstr="100" x0str="0.5" x1str="1" />;
            case 'gaussian':
                return <Gaussian matrixA="2,-1,0,3;1,0.5,3,8;0,13,-2,11;14,5,-2,3" matrixB="1,1,1,1" n="4" />;
            case 'multipleRoots':
                return <MultipleRoots funct="log(sin(x)^2 + 1) - 1/2" firstDerivate="sin(2x)" secondDerivate="2cos(2x)" tolerancestr="1e-7" iterationsstr="100" x0str="0.5" />;
            case 'GaussianPartialPivoting':
                return <GaussianPartialPivoting matrixA="4,-2,1;-2,4,-2;1,-2,4" vectorB="11,-16,17" n="3"></GaussianPartialPivoting>
            case 'GaussianTotalPivoting':
                return  <GaussianTotalPivoting matrixA="4,-2,1;-2,4,-2;1,-2,4" vectorB="11,-16,17" n="3"></GaussianTotalPivoting>
            case 'search':
                return <search f="x*x-4" x0string ="0" hstring="3" Nmaxstring="100"/>;
            case 'bisection':
                return <bisection f="x*x-4" astring="1" bstring="3" tolstring="1e-7" Nmaxstring="100"/>
            case 'falserule':
                return <falserule f="x*x-4" astring="1" bstring="3" tolstring="1e-7" Nmaxstring="100"/>
            default:
                return <h2>Selecciona un método</h2>;
        }
    };

    return (
        <div>
            <h1>Calculadora de Métodos Numéricos</h1>
            <div>
                <button onClick={() => setSelectedMethod('secant')}>secant </button>
                <button onClick={() => setSelectedMethod('gaussian')}> gaussian </button>
                <button onClick={() => setSelectedMethod('multipleRoots')}>multiple Roots</button>
                <button onClick={() => setSelectedMethod('GaussianPartialPivoting')}>Gaussian Partial Pivoting</button>
                <button onClick={() => setSelectedMethod('GaussianTotalPivoting')}>Gaussian Total Pivoting</button>
                <button onClick={() => setSelectedMethod('search')}>Incremental searches</button>
                <button onClick={() => setSelectedMethod('bisection')}>Bisection</button>
                <button onClick={() => setSelectedMethod('falserule')}>False position rule</button>
            </div>
            <div>
                {renderMethod()}
            </div>
        </div>
    );
};

export default MainPage;
