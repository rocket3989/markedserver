# 555 Timer


The 555 timer is a versatile electronic component, with uses ranging from an oscillator to make a light flash or a speaker buzz, to a schmitt trigger,
to smooth noisy signals. While the chip can be understood as a macro level, by experimenting with different methods of interfacing passive
components with this black box, it is much better understood by looking at the internals of the chip and how they react to inputs. In order to 
understand the chip, first the underlying theory of each internal component, and each accompanying passive element must be understood. 

-------

## Resistors

The most simple and fundamental electronic device is the passive component, the resistor. On the first day of any introductory electronics course, one 
will learn the relationship

![V = IR](/images/555_timer1.svg "V = IR")

This equation relates three fundamental concepts in electronics: Voltage- the potential of electrons to do work,
Current- the rate at which charge flows, and Resistance- the load that charge is pushed through. Resistors can be combined to change how they
influence a circuit. One such combination is series resistance

![Series Resistors](/images/555_timer_pic1.svg "Two resistors placed in series")

when resistors are connected one after another like this, their resistances are combined by adding them together. In this case, the equivalent 
resistance of the new circuit is 

![R = R_1 + R_2](/images/555_timer2.svg "R = R1 + R2")

Now, if we take that knowledge, and the relationship `V=IR`, we can construct the most simple circuit in electronics

![Voltage source powering two series resistors](/images/555_timer_pic5.svg "Voltage source powering two series resistors")

Through the two resistors, a current I will flow, determined by the resistance seen by the voltage source, which we know to be `R1+R2`. 
Therefore,

![I = \frac{V}{R_1+R_2}](/images/555_timer3.svg "I = V/(R1+R2)")

now we can apply the relationship again to find the voltage potential over one of the resistors, R2, and find that 

![V_(R2) = V\frac{R_2}{R_1+R_2}](/images/555_timer4.svg "VR2 = V(R2/R1+R2)")

Now we have created a voltage divider! The voltage seen by R2 will be proportional to the two resistor values, and if they are equal, it will be 1/2 the supply voltage

-----

## Capacitors

Capacitors are the second fundamental passive circuit element. It is a device that stores and releases electric charge, depending on the 
voltage
difference across its terminals. The voltage difference between the plates of the capacitor (V) is proportional to the charge on the plates (Q), and the capacitance (C)

![V_c = \frac{Q}{C}](/images/555_timer5.svg "Vc = Q/C")

A fundamental rule in electronics is Kirchhoff's voltage law, which states that the voltages across components in a loop of a circuit must sum to 0.
Using this rule, we can breakdown what happens when a capacitor charges

![capacitor charging circuit](/images/555_timer_pic2.svg "capacitor charging circuit")

When the switch is closed, the circuit becomes a loop, with the supply voltage, the resistor voltage, represented by  IR, and the capacitor voltage, Q/C. These values must sum to 0, so they can be expressed in the following equation

![V_s = IR + \frac{Q}{C}](/images/555_timer6.svg "Vs = IR + Q/C")

Current is the rate of charge flow over time, so
`I = dQ/dT` Which can be substituted into the equation, giving

![V_s =R\frac{dQ}{dT}+\frac{Q}{C}](/images/555_timer7.svg "Vs = R(dQ/dT)+Q/C")

This is first order differential equation, with the initial value of `Q = 0 at t = 0`. solving this, the general solution is 

![V_c = V_s(1-e^\frac{-t}{RC})](/images/555_timer8.svg "Vc = Vs(1-e^(-t/RC))")

This can now be solved for some general values, such as this time it takes the capacitor to reach a third of supply voltage by equating `Vc = 1/3 Vs`

![V_c=\frac{1}{3}V_s](/images/555_timer9.svg "Vc = 1/3Vs")

![\frac{1}{3} = (1-e^\frac{-t}{RC})](/images/555_timer10.svg "1/3 = 1-e^(-t/RC)")

![\frac{-t}{RC}=\ln(\frac{2}{3})](/images/555_timer11.svg "-t/RC = ln(2/3)")

![t \approx .4RC](/images/555_timer12.svg "t ~= .4RC")

So a capacitor charging through a resistor will charge to one third of the supply voltage in .4 times the constant RC. This value, RC, is common in electronics with timing circuitry because the charging and discharging of a capacitor is a consistent and measurable process. Applying the above manipulation to two thirds supply voltage,

![V_c=\frac{2}{3}V_s](images/555_timer13.svg "Vc = 2/3Vs")

![\frac{-t}{RC} = \ln(\frac{1}{3})](/images/555_timer14.svg "-t/RC = ln(1/3)")

![t\approx 1.1RC](/images/555_timer15.svg "t ~= 1.1RC")

Discharging a capacitor follows a similar pattern as charging, with this circuit being considered instead

![Capacitor discharge circuit](/images/555_timer_pic3.svg "Capacitor discharge circuit")

The differential equation works out to be 

![R\frac{dQ}{dT} =\frac{Q}{C}](/images/555_timer16.svg "R(dQ/dT) = Q/C")

with boundary condition `Vc = Vs at t=0`, leading to 

![V_c = V_s e^\frac{-t}{RC}](/images/555_timer17.svg "Vc = Vs e^(-t/RC)")

which is a reflection across 1/2 Vs from the charging equation, meaning that the derived values for charge and discharge are simply opposites,

![V_c =\frac{1}{3}V_s \rightarrow t \approx 1.1RC](/images/555_timer18.svg "Vc = 1/3Vs implies t ~= 1.1RC")

![V_c =\frac{2}{3}V_s \rightarrow t \approx .4RC](/images/555_timer19.svg "Vc = 2/3Vs implies t ~= .4RC")

----

## Comparator

Now that we have gone through the necessary passive components, it is time to analyze the active section of the chip. 
The comparator is a special type of op amp, with its characteristics chosen to act fully in the saturation region. 
The theory and application of the op amp is too much for this post, so instead it will only cover comparators.
The comparator has 2 inputs, 2 voltage sources and one output

![equation](/images/555_timer_pic4.svg)

The output of the comparator follows a simple rule: if the negative input is greater than the positive, the negative voltage source is passed to the output
in the opposite case, The positive voltage input is passed to the output.

![equation](/images/555_timer20.svg)

![equation](/images/555_timer21.svg)

Using this rule, comparators can be used to compare analog voltages and output a digital value. One use of a comparator would be too see if an analog voltage is greater than a threshold voltage. This circuit could be used, with the threshold set by a resistor voltage divider.

![equation](/images/555_timer_pic6.svg)

When the Signal is greater than the threshold voltage, the output becomes a logical high, and when it is not, it defaults to logic low.

![equation](/images/555_timer_pic7.svg)

3. transistors are the drivers of all computing devices, allowing logical switch operations to be done quickly, and on a small scale. 
{trans.jpeg}
When current is passed from the base lead to the emitter lead, it allows a proportional amount of current to flow through from collector to emitter.
This makes a BJT essentially an amplifier of current. This operation can be used in the "saturation region" where the current flow is all or nothing,
making the transistor act as a switch in an electronic circuit. In this operation, transistors drive all of digital electronics.
There is one "discrete" transistor in the 555 chip, which, at the right time in the timing sequence, will open a path to ground.
5. RS-latch 
The rs latch is the most basic component in an sequential logic circuit, that is, a circuit that not only acts on inputs, but on a previous state.
The latch has two inputs, a reset input and a set input, giving it the name Reset/set latch. The latch has a single bit of memory, which will store the state of the latch
That state is modified by the inputs. If the set input is triggered, the memory changes to high. reset trigger makes the value low. 
The whole time, the latch has two outputs, Q and ~Q which reflect the state of the memory of the cell, and are always opposite each other. 
{Rs data table}
one way to understand the rs-latch is to imagine a setup with a light bulb and two switches. One switch turns the lightbulb one, the other turns it off.
In this setup, the lightbulb is the logical Q output, and the switches represent the R and S inputs. 
Now to assemble the Timer. Staring on one side of the block diagram, 
 
# TK

# TK

# TK

# TK
