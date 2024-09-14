'''
Project Name:  Deal or No Deal
Author:  Jared Acosta
Due Date:  2023-05-03
Course:  CS 1410-x01

This program simulates the game show 'Deal or No Deal'.
The game has 26 briefcases, each with a unique amount of money. 
The player chooses a briefcase. 
The money in the first briefcase is not revealed until the end.
Then the player chooses additional briefcases. 
At certain intervals, the player will receive a banker offer.
The offer is an average of the amounts left in play.
If the player takes an offer, the player wins that amount of money, and the game ends. 
Otherwise, the player continues picking briefcases. 
If all briefcases are chosen, and no deal taken, the game ends.
The player then wins the money in their briefcase.
Gameplay is simulated using the kivy GUI.  

See requirements.txt for install requirements.
This program requires kivy installation.
It also requires pytest installation for test_classes.py.

In Codio, the game GUI is visible after running deal.py, 
and opening a Box URL.
'''

#Import app class
from game_gui import DealApp


def main():
    """Program starts here"""
    DealApp().run()


if __name__ == '__main__':
    main()
